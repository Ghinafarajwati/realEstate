import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Profile from './profile.jsx'
import CreateListing from './createListing.jsx'
import UserListings from './userListings.jsx'
import { useSelector } from 'react-redux'

export const Dashboard = () => {
    const location = useLocation()          //Mendapatkan URL saat ini
    const [tab, setTab] = useState('')      //menyimpan paramsnya
    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)          //ambil bagian yang ada setelah tanda tanya (?tab=profil) menyimpannya dalam variabel.
        const tabFromUrl = urlParams.get('tab')   //ambil parameter tab
        if(tabFromUrl) {
            setTab(tabFromUrl)    //Perbaharui tab
        }
    }, [location.search])
    return (
        <>
        <div>
            {tab === 'profile' && <div><Profile/></div>}
        </div>
        <div>
            {tab === 'create-listing' && <div><CreateListing/></div>}
        </div>
        <div>
            {tab === 'user-listing' && <div><UserListings user={user}/></div>}
        </div>
        </>
    )
}