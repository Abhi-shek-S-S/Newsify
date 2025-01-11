
function Footer() {
    return (
        <div>
            <div className="flex w-full justify-between items-center px-10 pt-10 pb-5">
                <div className="flex items-center">
                    <img src="/Images/logo .webp" className='w-20 h-20 mr-4 ' alt="logo" />
                    <p className="text-white font-extrabold text-[37px] break-words flex flex-col">INSIGHT TIMES </p>
                </div>
                <div className="flex items-center">
                    <p className="text-white font-semibold text-xl">Follow Us On Social Media</p>
                    <ul className="flex items-center">
                        <li><img src="/Images/facebook.svg" alt="facebook" className="w-10 h-10 p-2 rounded-full bg-gray-800 ml-4 cursor-pointer" /></li>
                        <li><img src="/Images/twitter.svg" alt="teitter" className="w-10 h-10 p-2 rounded-full bg-gray-800 ml-4 cursor-pointer" /></li>
                        <li><img src="/Images/insta.svg" alt="insta" className="w-10 h-10 p-2 rounded-full bg-gray-800 ml-4 cursor-pointer" /></li>
                        <li><img src="/Images/linkedin.svg" alt="linkedin" className="w-10 h-10 p-2 rounded-full bg-gray-800 ml-4 cursor-pointer" /></li>

                    </ul>
                </div>
            </div>
            <p className="text-center text-white font-semibold text-xl pb-5">Copyright ©  2025 Insight Times. All Rights Reserved</p>
        </div>
    )
}

export default Footer