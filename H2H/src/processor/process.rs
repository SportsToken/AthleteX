use solana_program::{
    account_info::{next_account_info, AccountInfo},
    decode_error::DecodeError,
    entrypoint::ProgramResult,
    info,
    instruction::{AccountMeta, Instruction},
    program_error::{PrintProgramError, ProgramError},
    program_option::COption,
    program_pack::{IsInitialized, Pack},
    pubkey::Pubkey,
    system_instruction::SystemInstruction,
    sysvar::{rent::Rent, Sysvar},
};
use std::cell::RefCell;
use crate::processor;

pub fn process(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult{
    let instruction_data = &RefCell::new(instruction_data);
    let instruction = instruction_data.borrow().first();

    Ok(match instruction {
        1 => process::process_enterqueue(program_id,accounts,instruction_data),
        2 => process::process_leavequeue(program_id,accounts,instruction_data),
        3 => process::process_creatematch(program_id,accounts,instruction_data),
        4 => process::process_cancelmatch(program_id,accounts,instruction_data),
        5 => process::process_updatelineup(program_id,accounts,instruction_data),
        6 => process::process_updateresults(program_id,accounts,instruction_data),
        7 => process::process_concludematch(program_id,accounts,instruction_data),
        _ => return Err()
    })
}