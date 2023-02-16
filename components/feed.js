export default function Feed({children, pfp, username, description}){
    return(
        <div>
            <div className="flex items-center">
                <img src={pfp} className="w-10 rounded-full" />
                <h2> {username} </h2>
            </div>
            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}