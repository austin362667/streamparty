import React, { useEffect } from "react";
import './Video.css';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import VideoSearch from './VideoSearch/VideoSearch';

import { sckt } from '../Socket';
import { insert } from './VideoHelper';

const Video = ({ log, name, room, videoProps, updateVideoProps, playerRef, sendVideoState, loadVideo, playVideoFromSearch }) => {

    useEffect(() => {
        // Send videoProps to new user
        const getSyncHandler = ({ id }) => {
            // log("New user needs videoProps to sync.", 'server');
            if (playerRef.current !== null && playerRef.current.internalPlayer !== null) {
                let player = playerRef.current.internalPlayer;
                player.getCurrentTime().then((currTime) => {
                    let params = {
                        id: id,
                        ...videoProps,
                        seekTime: currTime,
                        receiving: true
                    }
                    sckt.socket.emit('sendSync', params, (error) => { });
                });
            }
        }
        // Sync other user's videoProps to our state
        const startSyncHandler = (videoProps) => {
            // log("I'm syncing.", 'server');
            updateVideoProps({ ...videoProps });
            modifyVideoState({ ...videoProps });
            // loadVideo(videoProps.history[0], true);
        };
        // Update single value in videoProps from other user
        const receiveVideoStateHandler = ({ name, room, eventName, eventParams = {} }) => {
            const { seekTime, playbackRate, queue, searchItem, history } = eventParams;
            updateVideoProps({ receiving: true });
            switch (eventName) {
                case 'syncPlay':
                case 'syncSeek':
                    updateVideoProps({ playing: true, seekTime });
                    modifyVideoState({ playing: true, seekTime });
                    break;
                case 'syncPause':
                    updateVideoProps({ playing: false });
                    modifyVideoState({ playing: false });
                    break;
                case 'syncRateChange':
                    updateVideoProps({ playbackRate });
                    modifyVideoState({ playbackRate });
                    break;
                case 'syncLoad':
                    loadVideo(searchItem, false);
                    updateVideoProps({ history });
                    break;
                case 'syncLoadFromQueue':
                    loadFromQueue(queue);
                    break;
                case 'syncQueue':
                    updateVideoProps({ queue });
                    break;
                default:
                    break;
            }
        };

        
        sckt.socket.on("getSync", getSyncHandler);
        sckt.socket.on("startSync", startSyncHandler);
        sckt.socket.on("receiveVideoState", receiveVideoStateHandler);
        return () => {
            sckt.socket.off('getSync', getSyncHandler);
            sckt.socket.off('startSync', startSyncHandler);
            sckt.socket.off('receiveVideoState', receiveVideoStateHandler);
        };
    }, []);

    const loadFromQueue = (queue, sync = false) => {
        let nextVideo = queue.shift(); // Remove from beginning of queue
        if (nextVideo !== undefined) {
            loadVideo(nextVideo, sync);
            updateVideoProps({ queue });
            updateVideoProps({ history: [nextVideo, ...videoProps.history] });
        }
    }
    const modifyVideoState = (paramsToChange) => {
        if (playerRef.current !== null && playerRef.current.internalPlayer !== null) {
            const { lastStateYT } = videoProps;
            const { playing, seekTime, playbackRate } = paramsToChange;
            let player = playerRef.current.internalPlayer;
            if (playing !== undefined) {
                if (playing) {
                    if(seekTime) player.seekTo(seekTime);
                    // If not already playing
                    if (lastStateYT !== 1 || lastStateYT !== 3)
                        player.playVideo();
                } else {
                    // If not already paused
                    if (lastStateYT !== 2)
                        player.pauseVideo();
                }
            } else if (playbackRate !== undefined) {
                player.setPlaybackRate(playbackRate);
            }
        }
    }
    const addVideoToQueue = (searchItem) => {
        let { queue } = videoProps;
        let updatedQueue = insert(queue, queue.length, searchItem)
        sendVideoState({
            eventName: "syncQueue",
            eventParams: {
                queue: updatedQueue,
                type: "add"
            }
        });
        updateVideoProps({ queue: updatedQueue });
    }
    // // Debugging
    // useEffect(() => {
    //     console.log("Queue: ", videoProps.queue);
    // }, [videoProps.queue])
    // useEffect(() => {
    //     console.log("History: ", videoProps.history);
    // }, [videoProps.history])


    return (
        <div className="videoContainer">
            <VideoPlayer
                log={log}
                videoProps={videoProps}
                sendVideoState={sendVideoState}
                updateVideoProps={updateVideoProps}
                playerRef={playerRef}
                loadVideo={loadVideo}
                loadFromQueue={loadFromQueue}
            />
            <VideoSearch
                addVideoToQueue={addVideoToQueue}
                playVideoFromSearch={playVideoFromSearch}
            />
        </div>
    );
}

export default Video;