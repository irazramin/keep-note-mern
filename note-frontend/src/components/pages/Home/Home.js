import React, {useState} from 'react';
import SearchOption from "./SearchOption";
import Notes from "./Note/Notes";

const Home = () => {
    const [controlRender, setControlRender] = useState(false)

    return (
        <div className='m-10 w-full mx-auto'>
            <SearchOption setControlRender={setControlRender} controlRender={controlRender}/>
            <Notes controlRender={controlRender}/>
        </div>
    );
};

export default Home;
