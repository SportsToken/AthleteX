use std::cell::RefCell;
use arrayref::{array_mut_ref, array_ref, array_refs, mut_array_refs};
use solana_program::{
    program_error::ProgramError,
    //program_pack::{IsInitialized, Pack, Sealed},
    pubkey::{Pubkey},
};
//use std::borrow::BorrowMut;
use crate::structs::*;

pub struct Match<'a>{
    data: &'a RefCell<&'a mut [u8]>,
    offset: usize //what is this
}

impl<'a> Match<'a>{
    pub const LEN: usize = 32 + 32 + 15 /*NUM_FIGHTS_MAX*/*2 + 2; //size of the structure in bytes

    fn slice<'b>(
        &self,
        data: &'b mut [u8]
    ) ->(
        &'b mut [u8;32], //Pubkey1
        &'b mut [u8;32], //pubkey2
        &'b mut [u8;15 /*NUM_FIGHTS_MAX*/], //P1 picks
        &'b mut [u8;15 /*NUM_FIGHTS_MAX*/], //P2 picks
        &'b mut [u8;2] //Their bet (what each of them entered not the total)
    ){
        mut_array_refs![
            array_mut_ref![data, self.offset, Match::LEN],
            32,
            32,
            15, /*NUM_FIGHTS_MAX*/
            15, /*NUM_FIGHTS_MAX*/
            2
        ]
    }

    pub fn get_player_1(&self) -> Result<Pubkey,ProgramError>{
        Ok(Pubkey::new_from_array(*self.slice(&mut self.data.borrow_mut()).0))
    }
    pub fn set_player_1(&self,value: Pubkey){
        self.slice(&mut self.data.borrow_mut()).0.copy_from_slice(value.as_ref());
    }

    pub fn get_player_2(&self) -> Result<Pubkey,ProgramError>{
        Ok(Pubkey::new_from_array(*self.slice(&mut self.data.borrow_mut()).1))
    }
    pub fn set_player_2(&self,value:Pubkey){
        self.slice(&mut self.data.borrow_mut()).1.copy_from_slice(value.as_ref());
    }

    pub fn update_p1_picks(&self,value:&[u8;15 /*NUM_FIGHTS_MAX*/]){
        self.slice(&mut self.data.borrow_mut()).2.copy_from_slice(value.as_ref());
    }

    pub fn update_p2_picks(&self,value:&[u8;15 /*NUM_FIGHTS_MAX*/]){
        self.slice(&mut self.data.borrow_mut()).3.copy_from_slice(value.as_ref());
    }

    /*
    pub fn get_bet(&self) -> Result<u16,ProgramError>{
        //should this be returned as a u16 or &[u8,2]
    }
    pub fn set_bet(&self,value: ){

    }
    */
    //Returns true if there are 2 non empty pubkeys
    pub fn get_is_full(&self) -> Result<bool,ProgramError> {
        let zero_arr : [u8;32] = [0;32];
        let key1 = self.get_player_1()?.to_bytes();
        let key2 = self.get_player_2()?.to_bytes();
        Ok(!(key1 == zero_arr || key2 == zero_arr))
    }

    pub fn new(data: &'a RefCell<&'a mut [u8]>, offset: usize)-> Result<Match,ProgramError>{
        if data.borrow().len() < Self::LEN + offset {
            //Error
        }
        Ok(Match{data,offset})
    }
}