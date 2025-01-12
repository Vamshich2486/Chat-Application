import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation"

const Conversation = ({conversation,lastIdx,emoji}) => {
const { selectedConversation, setSelectedConversation }	= useConversation();

const isSelected = selectedConversation?._id === conversation._id;
const {onlineUsers} = useSocketContext();
const isOnline = onlineUsers.includes(conversation._id)
  return (
    <>
 			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
			  onClick={() => setSelectedConversation(conversation)}
			>
 				<div className={`avatar ${isOnline ? "online" : ""}`}>
 					<div className='w-12 rounded-full'>
 						<img
 							src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1736674799~exp=1736678399~hmac=971ff5f96a0571d0e9a96f95c5b4c27c54cba7c4b35adaaa2f90e8752136b68f&w=740"
							style={{height:"48px" ,width:"48px"}}
 							alt='user avatar'
 						/>
 					</div>
 				</div>

 				<div className='flex flex-col flex-1'>
 					<div className='flex gap-3 justify-between'>
 						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
 						<span className='text-xl'>{emoji}</span>
 					</div>
 				</div>
 			</div>

 			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
 		</>
  )
}

export default Conversation



//STARTER CODE FOR THIS FILE
// const Conversation = () => {
//     return (
//       <>
//                <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
//                    <div className='avatar online'>
//                        <div className='w-12 rounded-full'>
//                            <img
//                                src='https:cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
//                                alt='user avatar'
//                            />
//                        </div>
//                    </div>
  
//                    <div className='flex flex-col flex-1'>
//                        <div className='flex gap-3 justify-between'>
//                            <p className='font-bold text-gray-200'>John Doe</p>
//                            <span className='text-xl'>🎃</span>
//                        </div>
//                    </div>
//                </div>
  
//                <div className='divider my-0 py-0 h-1' />
//            </>
//     )
//   }
  
//   export default Conversation