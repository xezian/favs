import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import UseAxios from '../hooks/useAxios';

interface IBankCardProps {
    bank: IBankInfo
    faved: boolean
    bold?: boolean
    refreshFavs: () => void
    children?: any
}

export interface IBankInfo {
    UNINUM: number
    NAME: string
    WEBADDR: string
    ZIP: number
    CITY: string
    STNAME: string
    ASSET: string
    BKCLASS: string
    ACTIVE: string
    NAMEHCR: string
    MDI_STATUS_CODE: string
    MDI_STATUS_DESC: string
    OFFICES: number
}

const BankCard = (props: IBankCardProps) => {
    const { bank, faved, bold, refreshFavs, children } = props;
    const [go, setGo] = useState(false);
    const { response, fetchData } = UseAxios()
    const navigate = useNavigate();

    const handleClick = ()=> {
        fetchData({
            method: 'post',
            url: `/fav/`,
            params: bank
        })
    }

    const handleClickBankName = () => {
        setGo(true)
        if (!faved) {
            handleClick()
        } else {
            fetchData({
                method: 'get',
                url: `/fav/${bank.NAME}/${bank.UNINUM}`
            })
        }
    }
    
    useEffect(()=> {   
        if(response !== null) {
            if(go) {
                setGo(false)
                navigate(`/bank/${response.data.id}`)
            } else {
                refreshFavs()
            }
        }
    }, [response])

    return (
        <div className="bankCard">
            <div className="bankRow">
                <span className="bankLink" onClick={()=>handleClickBankName()}>{bold ? <strong>{bank.NAME}</strong> : bank.NAME}</span>
                <span onClick={()=>{handleClick()}} title={`${faved ? 'Unfav' : 'Fav'}`} className="clickEmoji">
                    {
                        faved ? '💚' : '🤍'
                    }
                </span>
            </div>
            {children}
        </div>
    )
}

BankCard.propTypes = {
    bank: PropTypes.object.isRequired
}

export default BankCard;
