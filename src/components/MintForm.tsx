import React from 'react';
import {useWalletData} from '../contexts/WalletDataContext';
import {WalletState} from '../types';

type Props = {
    onMint: (count: number) => void;
}

const MintForm: React.FC<Props> = ({onMint}) => {
    const {state} = useWalletData();
    const [count, setCount] = React.useState(1);
    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onMint(count);
    }, [count, onMint]);
    const handleCountChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCount(Number(e.target.value));
    }, []);
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="mintform_count" className="form-label">Count:</label>
            <input id="mintform_count" type="number" className="form-control form-control-lg" value={count} onChange={handleCountChange} min="1" max="5" />
            <button className="btn btn-primary text-uppercase fs-3 px-5 mt-4" type="submit" disabled={state !== WalletState.Connected}>
                Mint
            </button>
        </form>
    );
};

export default MintForm;
