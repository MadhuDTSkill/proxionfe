import { configureStore } from '@reduxjs/toolkit';
import Reducer from './Slice';

export default configureStore({
  reducer: {
    store: Reducer
  },
});
