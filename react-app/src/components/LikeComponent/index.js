


function LikeComponent({ song, sessionUser }) {
console.log("this is the session User", sessionUser)



    return (
        <div><h1>tester</h1>
        <div>{song.name}</div>
        <div>{sessionUser.alias}</div>

        </div>)
}

export default LikeComponent
