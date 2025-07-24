#!/usr/bin/env bash

dfx identity new minter
dfx identity use minter
export MINTER=$(dfx ledger account-id)

export TOKEN_NAME="Local ICP"
export TOKEN_SYMBOL="LICP"

dfx identity use default
export DEFAULT=$(dfx ledger account-id)

export PRE_MINTED_TOKENS=10_000_000_000
export TRANSFER_FEE=10_000

dfx identity use default

dfx deploy icp_ledger_canister --argument "
  (variant {
    Init = record {
      minting_account = \"$MINTER\";
      initial_values = vec {
        record {
          \"$DEFAULT\";
          record {
            e8s = $PRE_MINTED_TOKENS : nat64;
          };
        };
      };
      send_whitelist = vec {};
      transfer_fee = opt record {
        e8s = $TRANSFER_FEE : nat64;
      };
      token_symbol = opt \"$TOKEN_SYMBOL\";
      token_name = opt \"$TOKEN_NAME\";
    }
  })
"