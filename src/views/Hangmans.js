import React, {useEffect, useState} from "react";
import man1 from '../img/hang1.png';
import man2 from '../img/hang2.png';
import man3 from '../img/hang3.png';
import man4 from '../img/hang4.png';
import man5 from '../img/hang5.png';
import man6 from '../img/hang6.png';
import man7 from '../img/hang7.png';
import man8 from '../img/hang8.png';
import manFail from '../img/hang-fail.png';
import './Hangmans.css'

import {
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";

// 이미지 배열
const imgList = [man1, man2, man3, man4, man5, man6, man7, man8, manFail];

// 단어 딕셔너리
const wordDictionary = {
    "chuseok": "추석",
    "harvest": "수확",
    "fullmoon": "보름달",
    "autumn": "가을",
    "chestnuts": "밤",
    "lanterns": "등불",
    "holidat": "명절",
    "moon": "달",
    "pinetrees": "소나무",
    "incense": "향",
    "food": "음식",
    "ricecake": "떡",
    "songpyeon": "송편",
    "apple": "사과",
    "fruit": "과일",
    "pear": "배",
    "jeon": "전",
    "rib": "갈비",
    "family": "가족",
    "tradition": "전통",
    "ancestors": "조상",
    "bow": "절",
    "hanbok": "한복",
    "dance": "춤",
    "folkgames": "놀이",
    "folkmusic": "민요",
    "tugofwar": "줄다리기",
    "arirang": "아리랑",
    "swing": "그네",
    "hometown": "고향",
    "relative": "친척",
};
const Hangmans = () => {
    const [errorCount, setErrorCount] = useState(0);
    const [word, setWord] = useState("");
    const [answer, setAnswer] = useState("");
    const [end, setEnd] = useState(false);
    const [result, setResult] = useState("fail");
    const [selected, setSelected] = useState(false);

    // 26개 알파벳 버튼을 위한 배열
    const alphabet1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const alphabet2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const alphabet3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

    useEffect(() => {
        // 랜덤 단어 선택
        const wordList = Object.keys(wordDictionary);
        const randomIndex = Math.floor(Math.random() * wordList.length);
        const randomWord = wordList[randomIndex];
        setWord(randomWord);

        // 단어에 맞는 _ 생성
        var string = answer;
        for (var i = 0; i < randomWord.length; i++){
            string += "_ ";
        }
        setAnswer(string);
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

    const finish = () => {
        // 모든 알파멧 버튼의 클릭을 막음
        const alphaButtons = document.querySelectorAll(".alpha-btn");
        alphaButtons.forEach((element) => {
            element.style.cursor = "auto";
            element.setAttribute('disabled', 'true');
        });
    }

    const handleButtonClick = (buttonId) => {
        const button = document.getElementById(buttonId);
        const index = word.includes(buttonId);

        if (index){
            // 해당 알파벳이 단어에 존재할 때
            button.style.backgroundColor = "#5CACEE ";

            // 해당 알파벳의 위치를 모두 찾아 _ 대신 알파벳으로 바꿈
            var string = "";
            for (var i = 0; i < word.length; i++){
                if (word[i] === buttonId){
                    string += (buttonId + " ");
                }else {
                    string += (answer[i * 2] + answer[i * 2 + 1]);
                }
            }
            setAnswer(string);

            // 빈 칸이 없다면 종료
            if (string.includes("_") === false){
                setEnd(true);
                setResult("success");
                finish();
            }
        } else {
            // 해당 알파벳이 존재하지 않을 때
            button.style.backgroundColor = "red";
            setErrorCount(errorCount + 1);

            // 오류 횟수가 다 찼을 때 종료
            if (errorCount + 1 == imgList.length - 1){
                setEnd(true);
                finish();
            }
        }

        // 한 번 선택 된 알파벳 버튼에 대해 클릭이 안되도록 함
        button.style.cursor = "auto";
        button.setAttribute('disabled', 'true')
    };

    // 게임 종료 시 재시작 버튼
    const handleRestartClick = () => {
        window.location.reload();
    }

    return (
        <div>
            <Card>
                <CardTitle tag="h6" className="title">
                    <h2 style = {{fontSize: "30px"}}>HangMan</h2>
                </CardTitle>

                <CardBody className="image">
                    <div  style={{ textAlign: "center" }}>
                        <img
                            src={imgList[errorCount]}
                            style={{ maxWidth: "80%" }}
                        />
                        {selected &&
                            <h2 style={{ fontSize: "50px", margin: "0px"}}>{answer}</h2>
                        }
                        {selected == false &&
                            <div>
                                <button className="btn" onClick={() => setSelected(true)}>
                                    Let's
                                </button>
                                <button className="btn" onClick={() => setSelected(true)}>
                                    play
                                </button>
                                <button className="btn" onClick={() => setSelected(true)}>
                                    hangman
                                </button>
                            </div>
                        }

                    </div>
                </CardBody>

                <CardBody>
                    {selected &&
                        <div>
                            <div className="btn-box">
                                {alphabet1.map((letter) => (
                                    <button
                                        id={letter}
                                        className="alpha-btn"
                                        onClick={() => handleButtonClick(letter)}
                                    >
                                        {letter}
                                    </button>
                                ))}
                            </div>
                            <div className="btn-box">
                                {alphabet2.map((letter) => (
                                    <button
                                        id={letter}
                                        className="alpha-btn"
                                        onClick={() => handleButtonClick(letter)}
                                    >
                                        {letter}
                                    </button>
                                ))}
                            </div>
                            <div className="btn-box">
                                {alphabet3.map((letter) => (
                                    <button
                                        id={letter}
                                        className="alpha-btn"
                                        onClick={() => handleButtonClick(letter)}
                                    >
                                        {letter}
                                    </button>
                                ))}
                            </div>
                            <div className="btn-box">
                                {end && (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p style = {{fontSize: "30px", fontWeight : "bold", margin: "0px"}}>{result}</p>
                                        <p style = {{fontSize: "30px", margin: "0px"}}> 정답: {word}({wordDictionary[word]})</p>
                                        <button className = "reset" onClick={handleRestartClick}>restart</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                </CardBody>
            </Card>
        </div>
    );
};

export default Hangmans;