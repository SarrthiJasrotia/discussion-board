export default function Feed({children, pfp, username, description}){
    return(
        <div className="py-4 m-10 bg-neutral-800 border-4 rounded p-2">
            <div className="flex items-center ">
                <img src={pfp} className="m-2 w-10 h-10 rounded-full border-2" />
                <h2 className="text-xl"> {username} </h2>
            </div>
            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}