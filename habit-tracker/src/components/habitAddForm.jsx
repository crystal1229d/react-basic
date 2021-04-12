import React, { memo } from 'react';

const HabitAddForm = memo((props) => {
    // memo : props가 변경되지 않으면 안에 잇는 함수가 호출되지 않는다. state가 따로없다면 함수형 PureComponent 만들기
    // 함수에서는 this를 쓰지 않아도 바로 접근 가능 => 코드가 깔끔해지기 때문에 함수를 선호하는 경향이 있다.
    const inputRef = React.createRef();   // DOM요소에 바로 접근X. 리액트에서 제공하는 Ref이용 
    const formRef = React.createRef();

    const onSubmit = event => {
        event.preventDefault(); // onSubmit 발생시 브라우저 기본 동작(리프레쉬) 방지
        const name = inputRef.current.value;
        name && props.onAdd(name);
        // this.inputRef.current.value = '';
        formRef.current.reset();
    };

    return (
        <form ref={formRef} className="add-form" onSubmit={onSubmit}>
            <input ref={inputRef} type="text" className="add-input" placeholder="Enter Your Habit" />
            <button className="add-button">Add</button>
        </form>
    );
});

export default HabitAddForm;
