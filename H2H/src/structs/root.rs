use std::cell::RefCell;

pub struct Root<'a>{
    data: &'a mut [u8],
    offset: usize //what is this
}

impl<'a> Root<'a>{
    //pub const LEN: usize = 

    fn slice(
        &self,
        data: &mut [u8]
    ) ->(
        &mut [u8]
    ){

    }
}

