import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import userSlice from './slices/userSlice'
import movieSlice from './slices/movieSlice'
import commentSlice from "./slices/commentSlice"
import userPreferencesSlice from './slices/userPreferencesSlice'
import categorySlice from './slices/categorySlice'


const rootReducer = combineReducers({
    user: userSlice,
    movie: movieSlice,
    comment: commentSlice,
    userPreferences: userPreferencesSlice,
    category: categorySlice
})

const persistConfig = {
    key: "root",
    storage,
    version: 1,

}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)






