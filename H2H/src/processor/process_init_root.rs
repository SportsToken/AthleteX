use crate::structs::*;
use crate::processor::*;

use arrayref::{array_mut_ref, array_ref, mut_array_refs,array_refs};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    //decode_error::DecodeError,
    entrypoint::ProgramResult,
    //info,
    //instruction::{AccountMeta, Instruction},
    //program_error::{PrintProgramError, ProgramError},
    //program_option::COption,
    //program_pack::{IsInitialized, Pack},
    pubkey::Pubkey,
    //system_instruction::SystemInstruction,
    //sysvar::{rent::Rent, Sysvar},
};
//use std::borrow::Borrow;
use std::cell::RefCell;

const INIT_ROOT_ARGS_LEN:usize = 2;

pub fn process_init_root<'a>(
    program_id: &Pubkey,
    accounts: &'a [AccountInfo<'a>],
    instruction_data: &RefCell<&'a [u8]>,
) -> ProgramResult{

    let account_info_iter = &mut accounts.iter();
    let root_info = next_account_info(account_info_iter)?;
    if root_info.owner != program_id {
        //info!("Vote account does not have the correct program id");
        //return Err(ProgramError::IncorrectProgramId);
    }

    let root = Root::new(&root_info.data)?;

    root.set_num_fights(slice(&mut instruction_data.borrow_mut(),INIT_ROOT_ARGS_LEN).1[0]);

    let init_results: [u8;15] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //These 2 lines probably unnecessary
    root.update_fight_results(init_results);
    
    Ok(())
}


fn slice<'b>(
    data: &'b [u8],
    args_len: usize
) ->(
    &'b [u8;1],
    &'b [u8;1]
){
    array_refs![
        array_ref![data,0,INIT_ROOT_ARGS_LEN],
        1, //instruction
        1 //num fights
    ]
}