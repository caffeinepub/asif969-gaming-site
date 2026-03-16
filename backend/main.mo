import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User profile type for authentication component
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Internal types for users and transactions
  type User = {
    username : Text;
    phone : Text;
    hashedPassword : Text;
    balance : Nat;
    owner : Principal;
  };

  type Transaction = {
    userId : Text;
    type_ : Text;
    amount : Nat;
    timestamp : Time.Time;
    status : Text;
  };

  let users = Map.empty<Text, User>();
  let transactions = Map.empty<Text, List.List<Transaction>>();

  // ── Profile functions required by the frontend ──────────────────────────

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ── User account functions ───────────────────────────────────────────────

  public shared ({ caller }) func createUser(username : Text, phone : Text, hashedPassword : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create an account");
    };
    if (users.containsKey(username)) {
      Runtime.trap("User already exists");
    };

    let user : User = {
      username;
      phone;
      hashedPassword;
      balance = 0;
      owner = caller;
    };

    users.add(username, user);
  };

  public query ({ caller }) func getUser(username : Text) : async ?User {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can retrieve accounts");
    };
    switch (users.get(username)) {
      case (null) { null };
      case (?user) {
        if (user.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own account");
        };
        ?user;
      };
    };
  };

  public shared ({ caller }) func updateBalance(username : Text, amount : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update balances");
    };
    switch (users.get(username)) {
      case (null) {
        Runtime.trap("User not found");
      };
      case (?user) {
        let updatedUser : User = {
          username = user.username;
          phone = user.phone;
          hashedPassword = user.hashedPassword;
          balance = user.balance + amount;
          owner = user.owner;
        };
        users.add(username, updatedUser);
      };
    };
  };

  public shared ({ caller }) func addTransaction(userId : Text, type_ : Text, amount : Nat, status : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can add transactions");
    };
    switch (users.get(userId)) {
      case (null) {
        Runtime.trap("User not found");
      };
      case (?user) {
        if (user.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only add transactions for your own account");
        };
      };
    };

    let transaction : Transaction = {
      userId;
      type_;
      amount;
      timestamp = Time.now();
      status;
    };

    let userTransactions : List.List<Transaction> = switch (transactions.get(userId)) {
      case (null) { List.empty<Transaction>() };
      case (?txList) { txList };
    };

    userTransactions.add(transaction);
    transactions.add(userId, userTransactions);
  };

  public query ({ caller }) func getTransactions(userId : Text) : async [Transaction] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view transactions");
    };
    switch (users.get(userId)) {
      case (null) {
        Runtime.trap("User not found");
      };
      case (?user) {
        if (user.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own transactions");
        };
      };
    };
    switch (transactions.get(userId)) {
      case (null) { [] };
      case (?txList) { txList.toArray() };
    };
  };
};
