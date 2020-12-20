use solana_program::{
    account_info::{/*next_account_info,*/ AccountInfo},
    //decode_error::DecodeError,
    entrypoint::ProgramResult,
    //info,
    //instruction::{AccountMeta, Instruction},
    program_error::{PrintProgramError, ProgramError},
    //program_option::COption,
    //program_pack::{IsInitialized, Pack},
    pubkey::Pubkey,
    //system_instruction::SystemInstruction,
    //sysvar::{rent::Rent, Sysvar},
};
use std::cell::RefCell;
use crate::processor;

pub fn process<'a>(
    program_id: &Pubkey,
    accounts: &'a [AccountInfo<'a>],
    instruction_data: &'a [u8],
) -> ProgramResult{
    
    let instruction = instruction_data[0];//.borrow().first().unwrap();
    let instruction_data = &RefCell::new(instruction_data);

    match instruction {
        1 => {processor::process_init_root(program_id,accounts,instruction_data)}//initialize root
        //2 => processor::process_leave_queue(program_id,accounts,instruction_data),
        //3 => processor::process_create_match(program_id,accounts,instruction_data),
        //4 => processor::process_cancel_match(program_id,accounts,instruction_data),
        //5 => processor::process_update_lineup(program_id,accounts,instruction_data),
        //6 => processor::process_update_results(program_id,accounts,instruction_data),
        //7 => processor::process_conclude_match(program_id,accounts,instruction_data),
        _ => return Err(ProgramError::Custom(0)),
    }
}