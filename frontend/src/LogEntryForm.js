import React, { useState } from 'react';
import {useForm } from 'react-hook-form';

import { createLogEntry } from './API'

const LogEntryForm = ({location, onClose}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError ] = useState('');
    const { register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        try {
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            await createLogEntry(data);
            onClose();
        } catch (error) {
            console.error(error);
            setError(error.message);
            setLoading(false);
        }
    };

    return(
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input name="title" required ref={register}></input>
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" row={3} ref={register}></textarea>
      <label htmlFor="description">Description</label>
      <textarea name="description" row={3} ref={register}></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" ref={register}></input>
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required  ref={register}></input>
    <button disabled={loading}>{loading ? 'Loading..' : 'Create Travel Entry'}</button>
    </form>
    )
};

export default LogEntryForm;