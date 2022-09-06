import React, {useRef, useState} from 'react';

const Note = ({note}) => {
    const [collapseCard, setCollapseCard] = useState(false);
    const [title,setTitle] = useState('');
    const [desc,setDesc] = useState('');
    const titleRef = useRef(null);

    return (
        <label htmlFor="my-modal" className='w-[200px] modal-button border p-2 rounded pb-10 h-full cursor-pointer hover:shadow'>
            <div className=''>
                <h2 className='font-semibold text-base break-words'>{note.title}</h2>
                <h2 className='text-sm text-wrap w-full break-words mt-2'>{note.description}</h2>
            </div>


        </label>
    );
};

export default Note;
