import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Error "mo:base/Error";

actor class QuillAndCoin() = this {
  type Result<T> = Result.Result<T, Text>;
  type Article = {
    id : Nat;
    author : Principal;
    title : Text;
    content : Text;
    created_at : Int;
  };

  type Reward = {
    sender : Principal;
    recipient : Principal;
    amount : Nat;
    timestamp : Int;
  };

  stable var articles : [Article] = [];
  stable var nextId : Nat = 0;
  stable var rewards : [Reward] = [];

  public shared ({ caller }) func createArticle(title : Text, content : Text) : async Result<Article> {
    let article : Article = {
      id = nextId;
      author = caller;
      title = title;
      content = content;
      created_at = Time.now();
    };
    articles := Array.append(articles, [article]);
    nextId += 1;

    return #ok(article);
  };

  public shared query func getArticles() : async Result<[Article]> {
    return #ok(
      Array.sort<Article>(
        articles,
        func(a, b) : { #equal; #greater; #less } {
          if (b.created_at > a.created_at) #greater else if (b.created_at < a.created_at) #less else #equal;
        },
      )
    );
  };

  public shared ({ caller }) func recordReward(recipient : Principal, amount : Nat) : async Result<Reward> {
    let reward : Reward = {
      sender = caller;
      recipient = recipient;
      amount = amount;
      timestamp = Time.now();
    };
    rewards := Array.append(rewards, [reward]);
    return #ok(reward);
  };

  public shared query func getRewards() : async Result<[Reward]> {
    return #ok(rewards);
  };
};
