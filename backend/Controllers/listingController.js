import Listing from "../Models/listingModels.js"
import { ErrorHandler } from "../Utils/error.js"

export const CreateListing = async (req, res, next) => {
    const newListing = new Listing({...req.body})
    try {
        const saveListing = await newListing.save()
        return res.status(200).json({success: true, message: 'Successfully created', data: saveListing})
    } catch (error) {
        next(error)
    }
}

export const DeleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)           //cari data2 listing di database berdasarkan idnya
    if(!listing) {
        return next(ErrorHandler(401, "Listing not found!"))        
    }
    if (req.user.id !== listing.userRef) {              //jika user idnya gak sama dengan user yg punya db listing. jika ingin membandingkan 2 id di mangodb, wajib pakai toString()
        return next(ErrorHandler(401, "you can only delete your own listings"))
    }

    try { 
        await Listing.findByIdAndDelete(req.params.id) 
        res.status(200).json({success: true, message: "Listing has been deleted!"})
    } catch (error) {
        return next(error)
    }
}

export const UpdateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)
    if(!listing) {
        return next(ErrorHandler(401, "Listing not found"))
    }
    if (req.user.id  !== listing.userRef) {
        return next(ErrorHandler(401, 'you can only update your own listings'))
    }

    try {
        const updateListing = await Listing.findByIdAndUpdate(req.params.id, {
            $set : req.body
        }, {new: true})

        return res.status(200).json({success: true, message: 'Successfully update Listing', data: updateListing})
    } catch(error) {
        return next(error)
    }
}

export const getListing = async (req, res, next) => {
    try {
        const newListing = await Listing.findById(req.params.id)
        if(!newListing) {
            return next(ErrorHandler(401, "Listing not found!"))
        }
        res.status(200).json(newListing)
    } catch (error) {
        next(error)
    }
}


export const getBySearch = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 5;     //kalo limitnya gaada di req, maka tampilkan 9
        const startIndex = parseInt(req.query.startIndex) || 0
        
        let offer = req.query.offer
        if(offer === undefined || offer === 'false') {   //kalo offernya undefined/false (ga diisi), maka bisa: true atau false
            offer = {$in: [false, true]};                   //in : untuk mencocokkan
        } 
        let furnished = req.query.furnished
        if(furnished === undefined || furnished === 'false') {
            furnished = {$in: [false, true]};
        }
        let parking = req.query.parking
        if(parking === undefined || parking === 'false') {
            parking = {$in: [false, true]}
        }
        let type = req.query.type
        if(type === undefined || type === 'all') {
            type = {$in: ['sale', 'rent']}
        }

        const searchTerms = req.query.searchTerms || '' ;
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc'

        const search = await Listing.find({
            name: {$regex: searchTerms, $options: 'i'},
            offer, 
            furnished, 
            parking,
            type,
        }).sort({[sort]: order}).limit(limit).skip(startIndex)

        return res.status(200).json(search)

    } catch(error) {
        next(error)
    }
}