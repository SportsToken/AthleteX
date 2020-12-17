
enum eStatus{
    waiting,
    inProgress,
    complete
};

type matchup = {
    player1: string, //PublicKey
    player2: string,
    fights: object[], //necessary for program?
    results: string[],
    p1Picks: string[],
    p2Picks: string[]
    status: eStatus
};
