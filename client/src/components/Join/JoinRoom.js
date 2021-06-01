import React, { useEffect, useState } from 'react';
import { Button, Transition } from 'semantic-ui-react';
import { generateWords } from '../../utils/generateWords';
import Logo from '../Logo/Logo';
import './Join.scss';
const Spacer = require('react-spacer')

const JoinRoom = ({ location, history }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const joinRoom = () => {
        const randomRoom = encodeURIComponent(generateWords({ delimiter: '-', shouldCap: false }));
        history.push({
            pathname: `/room/${randomRoom}`,
            state: { from: location }
        });
    };
    
    const browse = () => {
       
        history.push({
            pathname: `/browse`,
            state: { from: location }
        });
    };
    // const browseRooms = () => {
    //     history.push(`/browse`);
    // }

    return (
        <div className='joinOuterContainer'>
            <Transition visible={mounted} animation='scale' duration={500}>
                <div className='joinInnerContainer'>
                    <Logo />
                    <section>
                        <div className="mid">
                            <h2>與遙遠的朋友一起看影片，重新定義派對的極限！</h2>
                        </div>
                        <Button
                            content='建立新房間'
                            // icon='sign-in'
                            // labelPosition='right'
                            className='button-join'
                            onClick={()=>joinRoom}
                        />
                        <Spacer width='12px' />
                        <Button
                            content='瀏覽熱門房間'
                            // icon='sign-in'
                            // labelPosition='right'
                            className='button-join'
                            onClick={()=>browse}
                        />
                    </section>
                </div >
            </Transition>
        </div >
    )
}

export default JoinRoom;
