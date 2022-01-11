import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FeedbackData from '../data/FeedbackData';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState(FeedbackData);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    // f-ja za brisanje feedback zapisa
    const deleteFeedback = (id) => {
        const newData = feedback.filter(item => item.id !== id);
        setFeedback(newData);
    }
    // f-ja za dodavanje feedback zapisa
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4(); // dodavanje random id-a
        setFeedback([newFeedback, ...feedback]);
    }
    // f-ja za setovanje statusa za izmenu feedbacka
    const editFeedback = (item) => {
        setFeedbackEdit({
            item: item,
            edit: true
        })
    }
    // f-ja za izmenu feedback-a
    const updateFeedback = (id, updatedItem) => {
        setFeedback(feedback.map((item) => item.id === id ?
            { ...item, ...updatedItem } : item));
    }


    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        feedbackEdit, // state
        editFeedback, //f-ja
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}


export default FeedbackContext;