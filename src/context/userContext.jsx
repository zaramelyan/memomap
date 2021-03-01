// /*eslint-disable*/
// import React, { createContext, useContext, useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'

// const UserContext = createContext(null)

// const UserContextProvider = (children) => {
//   const history = useHistory()
//   const [userData, setUserData] = useState(null)
//   const [entries, setEntries] = useState([])

//   useEffect(() => {
//     // if (userData) {
//     //   if (userData.apps && userData.apps.length) {
//     //     userData.apps.forEach((app: App) =>
//     //       setApps((apps) => [...apps, app.key])
//     //     );
//     //   }

//     //   //set default brand, if not selected
//     //   if (sessionStorage.length) {
//     //     setBrand(JSON.parse(sessionStorage.brandContext));
//     //   }
//     //   if (!sessionStorage.length && userData.brands) {
//     //     setBrand(userData.brands[0]);
//     //   }
//     // }
//   }, [userData])

//   return (
//     <UserContext.Provider
//       value={{
//         userData,
//         entries
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   )
// }

// const useUserContext = () => {
//   const context = useContext(UserContext)
//   return context
// }

// export { UserContextProvider, useUserContext }
