import React, { useCallback, useEffect, useRef, useState } from 'react';

// Component => React Hook
// state : useState (API)
// ** component와 달리 function이므로 컴포넌트가 변경(props, state)됐을 때 코드블럭 전체가 반복적으로 호출됨. => 모든 비즈니스 로직들이 다시 수행됨!
// 따라서 onClick에 전달한 콜백함수(handleIncrement)는 첫 번째 호출됐을 때 새로운 함수(=Object, reference: 1(예시))가 생성되고, 
// 다음에 state가 변경돼서 다시 SimpleHabit 함수가 호출되면 새로운 함수(=Object, reference: 2(예시))가 생성되고 전달된다.
// useState(0)에 의해 계속해서 0으로 초기화되지 않는 이유 : 이 컴포넌트에 연결된 state는 React에서 따로 저장되어 있기 때문
// createRef : 호출할때마다 늘 새로운 ref를 생성
// useRef : 호출할때 처음 한 번만 만들고 메모리에 저장해놓은 뒤 그 뒤부터는 그것을 재사용
// useCallback : React가 자동으로 캐시를 함으로써, 함수가 반복적으로 호출돼도 동일한 콜백함수를 전달 
// useEffect : useEffect을 통해 한 번만 정의함으로써 기존의 componentDidMount 와 componentDidUpdate 두 가지 사용 시의 코드 중복 문제 해결
//              처음 실행됐을때 & 호출될 때 
//              처음에만 실행하고 싶은 경우 (API를 받아오는 등의 작업) : useEffect(()=> {... }, []);  
//              값이 변경됐을 때만 실행하고 싶은 경우 : useEffect(()=> { ... }, [값1, 값2, 값3, ...]); 
// 

const SimpleHabit = (props) => {
    const [count, setCount] = useState(0);  // state = { count : 0, };
    const spanRef = useRef();

    const handleIncrement = useCallback(() => {
        setCount(count + 1);
    });
    
    useEffect(() => {
        console.log(`mounted & updated: ${count}`);
    }, [count]);

    return (
        <li className="habit">
            <span ref={spanRef} className="habit-name">Reading</span>
            <span className="habit-count">{count}</span>
            <button 
                className="habit-button habit-increate"
                onClick={handleIncrement}
            >
                <i className="fas fa-plus-square"></i>
            </button>
        </li>
    );
};

export default SimpleHabit;
