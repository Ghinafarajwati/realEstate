import userReducer from './user/userSlice.js'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({user: userReducer}) 

// Redux Persist Configuration
const persistConfig = {
  key: 'root',         //The name of the key to store the data
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)  

// Create a Redux store with persistedReducer configuration
export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

/*
1. combine reducer
2. konfigurasi redux persist
3. buat persistReducernya
4. redux store diisi dengan persistReducer
5. buat persistStorenya untuk membuat storenya persist
6. tambahkan persistor pada main.jsx
*/

export const persistor = persistStore(store)  //PersistStore akan membuat storenya persist