use crate::structs::*;
//use crate::processor::*;

//use arrayref::{array_mut_ref, array_ref, mut_array_refs,array_refs};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    //decode_error::DecodeError,
    entrypoint::ProgramResult,
    //info,
    //instruction::{AccountMeta, Instruction},
    //program_error::{PrintProgramError, ProgramError},
    //program_option::COption,
    //program_pack::{IsInitialized, Pack},
    //pubkey::Pubkey,
    //system_instruction::SystemInstruction,
    //sysvar::{rent::Rent, Sysvar},
    //system_program,
    system_instruction::transfer,
    program::invoke,
};
//use std::borrow::Borrow;
use std::cell::RefCell;

/*

*/
pub fn process_join_or_create_match<'a>(
    //program_id: &Pubkey,
    accounts: &'a [AccountInfo<'a>],
    instruction_data: &RefCell<&'a [u8]>,
) -> ProgramResult{

    //Grabbing the root account
    let account_info_iter = &mut accounts.iter();
    let root_info = next_account_info(account_info_iter)?;
    let root = Root::new(&root_info.data)?;

    let player_bet = instruction_data.borrow()[1];
    if player_bet <= 0{
        //error
    }

    //Verify the user has funds to place this bet
    //And send the transaction
    let user_account_info = next_account_info(account_info_iter)?;
    if user_account_info.is_signer == false{
        //error
    }
    if user_account_info.lamports() < player_bet as u64{
        //error
    }
    let user_pubkey = user_account_info.key;
    let instruction = transfer(user_pubkey, root_info.key, player_bet as u64);
    let system_program_account_info = next_account_info(account_info_iter)?;
    let accounts = [
        user_account_info.clone(),
        root_info.clone(),
        system_program_account_info.clone()
    ];
    invoke(&instruction, &accounts)?;

    //Check if there are nonfull matches to be filled
    let mut match_was_found = false;

    let match_list = root.get_match_list()?;
    let match_count = match_list.get_count();
    for i in 0..match_count{
        let a_match = match_list.get(i)?;
        let p1 = a_match.get_player_1()?;
        let p2 = a_match.get_player_2()?;

        //If the match is not full and the bets are the same...
        if !(a_match.get_is_full()?) && a_match.get_bet()? == player_bet.into(){
            //Find the empty key and verify the other is not equal to the searching user
            //The empty key should always be the second one but we will check both anyways 
            let empty_ar = [0;32];
            if p2.to_bytes() == empty_ar && p1 != *user_pubkey{
                //add user here
                a_match.set_player_2(*user_pubkey);
                match_was_found = true;
            }else if p1.to_bytes() == empty_ar && p2 != *user_pubkey{
                //add user here
                a_match.set_player_1(*user_pubkey);
                match_was_found = true;
            }
        }
    }

    //Assume user was not added anywhere
    if !match_was_found{
        let new_match = match_list.create()?;
        new_match.set_player_1(*user_pubkey);
        new_match.set_bet(player_bet.into());
    }
    Ok(())
}