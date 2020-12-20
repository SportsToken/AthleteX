use std::cell::RefCell;
use crate::structs::*;
use arrayref::{array_mut_ref, array_ref, mut_array_refs};
use solana_program::{
    program_error::ProgramError,
    //program_pack::{IsInitialized, Pack, Sealed},
    pubkey::Pubkey,
};
//use std::borrow::BorrowMut;

pub struct Root<'a>{
    data: &'a RefCell<&'a mut [u8]>,
    offset: usize //what is this
}

impl<'a> Root<'a>{
    pub const LEN: usize = 1 + 15 /*NUM_FIGHTS_MAX*/ + MatchList::LEN as usize;

    fn slice<'b>(
        &self,
        data: &'b mut [u8]
    ) ->(
        &'b mut [u8;1],    //number of fights this event
        &'b mut [u8;15 /*NUM_FIGHTS_MAX*/], //fight results
        &'b mut [u8;MatchList::LEN] //match list
    ){
        mut_array_refs![
            array_mut_ref![data,self.offset,Root::LEN],
            1,
            15 /*NUM_FIGHTS_MAX*/,
            MatchList::LEN as usize
        ]
    }

    pub fn get_num_fights(&self) -> u8{
        self.slice(&mut self.data.borrow_mut()).0[0]
    }
    pub fn set_num_fights(&self, value:u8){
        self.slice(&mut self.data.borrow_mut()).0[0] = value;
    }

    pub fn update_fight_results(&self,value: [u8;15]){
        self.slice(&mut self.data.borrow_mut()).1.copy_from_slice(value.as_ref());
    }

    //get match list


    pub fn new(data: &'a RefCell<&'a mut [u8]>) -> Result<Root,ProgramError>{
        if data.borrow().len() != Self::LEN{
            //Error
        }
        Ok(Root{data, offset:0})
    }
}

