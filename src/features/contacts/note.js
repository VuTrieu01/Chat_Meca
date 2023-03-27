// import React, { useState, useEffect } from "react";

// function FriendSuggestion() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Lấy dữ liệu từ API về danh sách các người dùng
//     const fetchData = async () => {
//       const response = await fetch("https://example.com/api/users");
//       const data = await response.json();
//       setUsers(data);
//     };
//     fetchData();
//   }, []);

//   const getMutualFriends = (userA, userB) => {
//     // Xác định các bạn chung giữa userA và userB
//     const mutualFriends = userA.friends.filter((friendA) =>
//       userB.friends.some((friendB) => friendB.id === friendA.id)
//     );
//     return mutualFriends.length;
//   };

//   const getSuggestedFriends = () => {
//     const suggestedFriends = [];

//     // Duyệt qua tất cả các cặp người dùng để xác định mức độ tương tự giữa chúng
//     for (let i = 0; i < users.length; i++) {
//       for (let j = i + 1; j < users.length; j++) {
//         const mutualFriends = getMutualFriends(users[i], users[j]);

//         // Nếu số lượng bạn chung lớn hơn 2 và chưa có trong danh sách đề xuất
//         if (
//           mutualFriends > 2 &&
//           !suggestedFriends.includes(users[i]) &&
//           !suggestedFriends.includes(users[j])
//         ) {
//           // Thêm vào danh sách đề xuất
//           suggestedFriends.push(users[i], users[j]);
//         }
//       }
//     }

//     return suggestedFriends;
//   };

//   const suggestedFriends = getSuggestedFriends();

//   return (
//     <div>
//       <h2>Suggested Friends</h2>
//       <ul>
//         {suggestedFriends.map((user) => (
//           <li key={user.id}>
//             <img src={user.avatar} alt={user.name} />
//             <span>{user.name}</span>
//             <span>
//               Mutual Friends: {getMutualFriends(user, suggestedFriends[0])}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default FriendSuggestion;

import React, { useState } from "react";

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: "John", friends: [2, 3, 4] },
    { id: 2, name: "Sarah", friends: [1, 3] },
    { id: 3, name: "Bob", friends: [1, 2] },
    { id: 4, name: "Alice", friends: [1] },
  ]);

  // Tạo bảng băm để lưu trữ danh sách bạn của mỗi người dùng
  const userMap = {};
  users.forEach((user) => {
    userMap[user.id] = user.friends;
  });

  // Tìm kiếm số lượng bạn chung giữa hai người dùng
  const getCommonFriendsCount = (userId1, userId2) => {
    const friends1 = userMap[userId1];
    const friends2 = userMap[userId2];
    let count = 0;
    friends1.forEach((friendId) => {
      if (friends2.includes(friendId)) {
        count++;
      }
    });

    return count;
  };

  return (
    <div>
      <h1>Danh sách bạn</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>Số lượng bạn: {user.friends.length}</p>
          <ul>
            {user.friends.map((friendId) => (
              <li key={friendId}>
                {users.find((u) => u.id === friendId).name}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h1>Số lượng bạn chung</h1>
      {users.map((user1) => (
        <div key={user1.id}>
          <h2>{user1.name}</h2>
          <ul>
            {users.map((user2) => {
              if (user1.id !== user2.id) {
                const count = getCommonFriendsCount(user1.id, user2.id);
                return (
                  <li key={user2.id}>
                    {user2.name}: {count}
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
