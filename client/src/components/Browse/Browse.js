import React, { useEffect, useState } from 'react';
import { sckt } from '../Socket';
import './Browse.scss';
import { Button } from 'semantic-ui-react';

const Browse = ({ history }) => {
    const [room, setRoom] = useState('');
    const [allRoomData, setAllRoomData] = useState([]);
    useEffect(() => {
        sckt.socket.emit('getAllRoomData', (error) => { });
        sckt.socket.on("allRoomData", ({ allRoomData }) => {
            setAllRoomData(allRoomData);
        });
    });
//     console.log(room);

    const joinRoom = (joinRoom) => {
        let trimmedRoom = joinRoom.trim();
        if (trimmedRoom.length > 0) {
            history.push(`/room/${trimmedRoom}`);
        }
    };

    return (
        <div className='browseContainer'>
            {
                allRoomData.length == 0 &&
                <h3>There are currently no public rooms ☹️</h3>
            }
            <ul>
                {
                    allRoomData.map((room) => {
                        return (
                            <li className="list-group-item">
                                <div className="search-item-container">
                                    <div className="search-item-thumb">
                                        {room.currVideo == "not playing"? <img src={'https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif'} />:<img src={room.currVideo.video.thumbnail} />}
                                    </div>
                                    <div className="search-item-body">
                                        <h3 className="search-item-video-title">
                                            {room.currVideo == "not playing"? '運作中..':room.currVideo.video.title}
                                        </h3>
                                        <div className="search-item-channel-date">
                                            {room.numUsers} 位同學
                                            {/* {
                                                room.currVideo.channel.verified &&
                                                <FontAwesomeIcon id='verifiedIcon' icon="check-circle" size="sm" />
                                            } */}
                                        </div>
                                        <Button 
                                            className='button-join'
                                            onClick={()=>{joinRoom(room.room)}}
                                            content='訪客加入'
                                        />
                                    </div>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}

export default Browse;
