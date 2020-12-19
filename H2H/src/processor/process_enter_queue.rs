use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    pubkey::Pubkey,
};

////
/// Dont make a queue
/// 
pub fn process_enter_queue(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult{
    let account_info_iter = &mut accounts.iter();
    let user_account = next_account_info(account_info_iter);

    let data_iter = &mut instruction_data.iter();

    data_iter.next(); //first byte is the instruction
    let bet = data_iter.next();

    let q_address = Pubkey::create_program_address(&["Queue".as_bytes()],&program_id);

    Ok(())
}