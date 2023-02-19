export default function Feed({children, pfp, username, description}){
    return(
        <div className="py-4 m-10 border-yellow-500 border-b-4">
            <div className="flex items-center ">
                <img src={pfp} className="m-2 w-10 h-10 rounded-full border-2" />
                <h2> {username} </h2>
            </div>
            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}