import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

persistent actor Token {
    // Додаємо transient до кожної змінної, на яку скаржиться moc
    transient let owner : Principal = Principal.fromText("oyjdb-nvyry-3ogif-jkwrs-due4f-eulp6-7zgjg-fmzcn-wferi-oapfu-fae");
    transient let totalSupply : Nat = 1000000000;
    transient let symbol : Text = "LToken";

    transient let balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    // Прибираємо ignore, бо термінал каже, що воно зайве (warning M0089)
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
            balances.put(msg.caller, amount);
            return "Success!";
        };
        return "You have already received your payout.";
    };


}