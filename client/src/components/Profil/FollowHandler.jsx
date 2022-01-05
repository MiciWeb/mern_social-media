// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { followUser } from "../../actions/user.actions";

// export default function FollowHandler({ idToFollow }) {
//   const userData = useSelector((state) => state.userReducer);
//   const [isFollowed, setIsFollowed] = useState(false);
//   const dispatch = useDispatch();

//   const handleFollow = () => {
//     dispatch(followUser(userData._id, idToFollow));
//     setIsFollowed(true);
//   };

//   //   const handleUnfollow = () => {
//   //     dispatch(unfollowUser(userData._id, idToFollow));
//   //     setIsFollowed(false);
//   //   };

//   useEffect(() => {
//     if (!isEmpty(userData.following)) {
//       if (userData.following.includes(idToFollow)) {
//         setIsFollowed(true);
//       } else setIsFollowed(false);
//     }
//   }, [userData, idToFollow]);
//   return (
//     <div>
//       {isFollowed && !isEmpty(userData) && (
//         <span onClick={handleUnfollow}>
//           {type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
//           {type === "card" && <img src="./img/icons/checked.svg" alt="checked" />}
//         </span>
//       )}
//       {isFollowed === false && !isEmpty(userData) && (
//         <span onClick={handleFollow}>
//           {type === "suggestion" && <button className="follow-btn">Suivre</button>}
//           {type === "card" && <img src="./img/icons/check.svg" alt="check" />}
//         </span>
//       )}
//     </div>
//   )
// }

import React from 'react'

export default function FollowHandler() {
  return (
    <div>
      
    </div>
  )
}
