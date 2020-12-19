use solana_program::{
    program_error::ProgramError,
    program_pack::{Pack, Sealed},
};
use std::cell::RefCell;
use arrayref::{array_mut_ref, array_ref, mut_array_refs};
use crate::structs::*;
use byteorder::{ByteOrder, LittleEndian};
use std::borrow::BorrowMut;

pub struct MatchList<'a>{
    data: &'a RefCell<&'a mut [u8]>,
    offset: usize
}
impl<'a> MatchList<'a>{
    pub const MATCH_SIZE : usize = Match::LEN;
    pub const LEN: usize = 2 + MatchList::MATCH_SIZE * 16;//match_capacity;

    fn slice<'b>(
        &self,
        data: &'b mut [u8]
    ) ->(
        &'b mut [u8;2],
        &'b mut [u8;MatchList::LEN - 2 as usize]
    ){
        mut_array_refs![
            array_mut_ref![data,self.offset,MatchList::LEN],
            2,
            MatchList::LEN -2 as usize
        ]
    }

    //Get the # of matches
    pub fn get_count(&self) -> u16{
        LittleEndian::read_u16(self.slice(&mut self.data.borrow_mut()).0)
    }
    pub fn set_count(&self,value: u16){
        LittleEndian::write_u16(self.slice(&mut self.data.borrow_mut()).0,value);
    }

    //Get a Match by index
    pub fn get(&self,i: u16) -> Result<Match<'a>,ProgramError>{
        if i >= self.get_count(){
            //error
        }
        Match::new(self.data,self.offset + 2 + i as usize* MatchList::MATCH_SIZE)
    }

    //Create a new match
    pub fn create(&self) -> Result<Match<'a>,ProgramError>{
        if self.get_count() >= 16/*match_capacity*/{
            //error
        }
        self.set_count(self.get_count()+1);
        let new_match = self.get(self.get_count()-1)?;
        Ok(new_match)
    }
}