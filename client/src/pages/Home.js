import React from 'react'
import LeftNav from "../components/LeftNav"
import Tread from "../components/Thread"

export default function Home() {
    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <Tread />
            </div>
        </div>
    )
}
