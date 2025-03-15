import React, { useState, useEffect } from 'react'

const Test = () => {

  const [finalUsers, setFinalUsers] = useState([])

  const prepareUsersInvitationData = () => {
    let finalUsers = []
    const filterdInvitations = invitations.filter(invitation => !invitation.is_expired)

    for (let i = 0; i < filterdInvitations.length; i++) {
      let invitation = filterdInvitations[i]
      let user = users.find(user => user.email === invitation.to_email)
      if (user) {
        finalUsers.push({
          ...invitation,
          ...user
        })
      }
      else {
        finalUsers.push({
          ...invitation,
          // ...{
          //   name: "User not found",
          //   email: "User not found",
          //   phone_number: "User not found",
          //   profile_picture: "User not found",
          // }
        })
      }
    }
    setFinalUsers(finalUsers)
  }


  useEffect(() => {
    prepareUsersInvitationData()
  }, [])

  return (
    <div style={{ padding: '24px', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Final Users</h2>
      {finalUsers.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {finalUsers.map((user, index) => (
            <div key={index} style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '16px', border: '1px solid #d1d5db' }}>
              {Object.keys(user).map((key) => (
                <p key={key} style={{ color: '#374151' }}>
                  <strong style={{ textTransform: 'capitalize' }}>{key.replace('_', ' ')}:</strong> {String(user[key])}
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#4b5563' }}>No matching users found.</p>
      )}
    </div>

  )
}

export default Test


const users = [
  {
    "id": "4a9aa374-294a-4bca-aaa6-10059d9dcb90",
    "is_active": true,
    "created_at": "2025-02-24T10:27:34.947419Z",
    "updated_at": "2025-03-04T17:25:09.897895Z",
    "first_name": "Uday",
    "last_name": "Kiran",
    "email": "uday.kiran@dtskill.com",
    "last_login": null,
    "is_superuser": false,
    "is_admin": true
  },
  {
    "id": "86d05256-33e5-4f06-ad6b-c2e9ef4ca3e1",
    "is_active": true,
    "created_at": "2025-02-24T10:11:49.421729Z",
    "updated_at": "2025-02-28T11:32:00.554678Z",
    "first_name": "Madhu",
    "last_name": "Sunil",
    "email": "bagammagarimadhu@gmail.com",
    "last_login": null,
    "is_superuser": true,
    "is_admin": false
  },
  {
    "id": "8ff09411-2fc7-453a-85b7-27f61d35500f",
    "is_active": true,
    "created_at": "2025-02-24T09:43:43.199789Z",
    "updated_at": "2025-03-04T10:13:08.124728Z",
    "first_name": "sawata",
    "last_name": "gore",
    "email": "sawata.gore@dtskill.com",
    "last_login": null,
    "is_superuser": false,
    "is_admin": true
  },
  {
    "id": "c44ba5e5-04bb-4aec-a413-e19eba861e48",
    "is_active": true,
    "created_at": "2025-03-05T06:23:49.342135Z",
    "updated_at": "2025-03-05T06:23:49.342174Z",
    "first_name": "gene1",
    "last_name": "usr",
    "email": "gene1usr@yopmail.com",
    "last_login": null,
    "is_superuser": false,
    "is_admin": false
  },
  {
    "id": "e3e10265-155c-4334-9918-c9773c886633",
    "is_active": true,
    "created_at": "2025-03-03T11:34:36.757238Z",
    "updated_at": "2025-03-03T12:23:43.252958Z",
    "first_name": "Benz",
    "last_name": "merch",
    "email": "repaj97985@egvoo.com",
    "last_login": null,
    "is_superuser": false,
    "is_admin": false
  },
  {
    "id": "ef9bae6d-e57e-4e25-bd09-6facf8167a41",
    "is_active": true,
    "created_at": "2025-03-04T06:23:42.855196Z",
    "updated_at": "2025-03-04T10:17:14.583097Z",
    "first_name": "Nilanjan",
    "last_name": "Joarder",
    "email": "nilanjan.joarder@dtskill.com",
    "last_login": null,
    "is_superuser": false,
    "is_admin": false
  }
]

const invitations = [
  {
    "id": "0e75b8d2-90e7-4345-9743-e80a401fe96d",
    "is_expired": true,
    "created_at": "2025-03-03T12:37:15.281498Z",
    "updated_at": "2025-03-03T12:38:03.294551Z",
    "from_email": "bagammagarimadhu@gmail.com",
    "to_email": "sawatagore27@gmail.com",
    "access_url": "http://localhost:3000",
    "is_accepted": true
  },
  {
    "id": "1debeaa7-b7e8-41ff-bc2f-038bff251cb3",
    "is_expired": true,
    "created_at": "2025-02-26T17:44:43.786563Z",
    "updated_at": "2025-02-26T17:44:43.786563Z",
    "from_email": "madhu.bagamma@dtskill.com",
    "to_email": "uday.kiran@dtskill.com",
    "access_url": "https://genedev.dtskill.com",
    "is_accepted": true
  },
  {
    "id": "3bc07eac-43a5-4d88-b1af-e5346cb2d4bc",
    "is_expired": true,
    "created_at": "2025-03-03T12:26:43.571348Z",
    "updated_at": "2025-03-03T12:32:54.646226Z",
    "from_email": "bagammagarimadhu@gmail.com",
    "to_email": "sawatagore27@gmail.com",
    "access_url": "http://localhost:3000",
    "is_accepted": true
  },
  {
    "id": "5aa630aa-cb24-42d5-b3d9-08857a3c22c5",
    "is_expired": true,
    "created_at": "2025-03-05T06:22:23.786799Z",
    "updated_at": "2025-03-05T06:23:50.442034Z",
    "from_email": "bagammagarimadhu@gmail.com",
    "to_email": "gene1usr@yopmail.com",
    "access_url": "https://genedev.dtskill.com",
    "is_accepted": true
  },
  {
    "id": "7dc789f5-e347-47f8-8fc7-805765f63f00",
    "is_expired": true,
    "created_at": "2025-03-03T12:24:06.933509Z",
    "updated_at": "2025-03-03T12:24:06.933543Z",
    "from_email": "bagammagarimadhu@gmail.com",
    "to_email": "sawatagore27@gmail.com",
    "access_url": "http://localhost:3000",
    "is_accepted": false
  },
  {
    "id": "8378614a-e7d9-4cd2-bdfe-9b16b1054016",
    "is_expired": true,
    "created_at": "2025-03-03T11:30:10.363701Z",
    "updated_at": "2025-03-03T11:34:37.938093Z",
    "from_email": "bagammagarimadhu@gmail.com",
    "to_email": "repaj97985@egvoo.com",
    "access_url": "http://localhost:3000",
    "is_accepted": true
  },
  {
    "id": "95ab7759-c4dd-4e06-b9ae-ba55b299e809",
    "is_expired": true,
    "created_at": "2025-02-24T10:20:35.393736Z",
    "updated_at": "2025-02-24T10:27:35.708627Z",
    "from_email": "bagammagarimadhu@gmail.com",
    "to_email": "uday.kiran@dtskill.com",
    "access_url": "http://localhost:3000",
    "is_accepted": true
  },
  {
    "id": "b72fcc1a-0ef6-42bb-bf6e-3adffd55a034",
    "is_expired": true,
    "created_at": "2025-02-26T12:02:59.744116Z",
    "updated_at": "2025-02-26T12:02:59.744155Z",
    "from_email": "bagammagarimadhu@gmail.com",
    "to_email": "rahul.yadav@dtskill.com",
    "access_url": "http://localhost:3000",
    "is_accepted": false
  },
  {
    "id": "b9d8b4e6-175d-48af-9629-fb93458346d1",
    "is_expired": true,
    "created_at": "2025-02-26T17:45:27.105544Z",
    "updated_at": "2025-02-26T17:45:27.105544Z",
    "from_email": "uday.kiran@dtskill.com",
    "to_email": "madhu.bagamma@dtskill.com",
    "access_url": "https://genedev.dtskill.com",
    "is_accepted": false
  },
  {
    "id": "e0a80918-c3df-42c5-866c-eefe3eb6f75e",
    "is_expired": true,
    "created_at": "2025-02-26T15:43:51.596230Z",
    "updated_at": "2025-02-26T15:43:51.596293Z",
    "from_email": "bagammagarimadhu@gmail.com",
    "to_email": "tejas.patil@dtskill.com",
    "access_url": "https://genedev.dtskill.com",
    "is_accepted": false
  }
]