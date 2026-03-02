import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

persistent actor Token {
    transient let owner : Principal = Principal.fromText("oyjdb-nvyry-3ogif-jkwrs-due4f-eulp6-7zgjg-fmzcn-wferi-oapfu-fae");
    transient let totalSupply : Nat = 1000000000;
    transient let symbol : Text = "LToken";

    var balanceEntries : [(Principal, Nat)] = [];

    private transient var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    balances.put(owner, totalSupply);

    public query func balanceOf(who: Principal): async Nat {
        switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };
    };

    public query func getSymbol(): async Text {
        return symbol;
    };

    public shared(msg) func payOut(): async Text {
        Debug.print(debug_show(Principal.toText(msg.caller)));
        if(balances.get(msg.caller) == null) {
            let amount = 1000;
            let result = await transfer(msg.caller, amount);
            return result;
        };
        return "You have already received your payout.";
    };

    public shared (msg) func transfer(to: Principal, amount: Nat): async Text {
        let fromBalance = await balanceOf(msg.caller);
        if(fromBalance >= amount) {
            let newFromBalance:Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);
            let toBalance = await balanceOf(to);
            balances.put(to, toBalance + amount);
            return "Transfer successful!";
        };
        return "Insufficient balance.";
    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if(balances.size() < 1) {
            balances.put(owner, totalSupply);
        };
        balanceEntries := [];
    };

};