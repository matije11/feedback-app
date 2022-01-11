import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    useEffect(() => {
        fetchFeedback();
    }, [])

    // fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch('/feedback?_sort=id&_order=desc');
        const data = await response.json();
        setFeedback(data);
        setIsLoading(false);
    }

    // f-ja za brisanje feedback zapisa
    const deleteFeedback = async (id) => {
        const newData = feedback.filter(item => item.id !== id);
        await fetch(`/feedback/${id}`, {
            method: 'DELETE'
        })
        setFeedback(newData);
    }

    // f-ja za dodavanje feedback zapisa
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFeedback)
        })
        const data = await response.json();
        //newFeedback.id = uuidv4(); // dodavanje random id-a
        setFeedback([data, ...feedback]);
    }

    // f-ja za setovanje statusa za izmenu feedbacka
    const editFeedback = (item) => {
        setFeedbackEdit({
            item: item,
            edit: true
        })
    }

    // f-ja za izmenu feedback-a
    const updateFeedback = async (id, updatedItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem)
        })
        const data = await response.json();
        setFeedback(feedback.map((item) => item.id === id ?
            { ...item, ...data } : item));
    }

    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        feedbackEdit, // state
        editFeedback, //f-ja
        updateFeedback,
        isLoading
    }}>
        {children}
    </FeedbackContext.Provider>
}


export default FeedbackContext;