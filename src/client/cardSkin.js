import * as classNames from 'classnames';
import React from 'react';
import { useTransition, to } from 'react-spring';
import { animated } from 'react-spring';
import { BASIC, EQUIPMENT } from '../lib/cardCategories.js';
import STSMAP from '../lib/stsmap.json'
import './cardSkin.css';

const SUITS = {
    'CLUB': '♣',
    'DIAMOND': '♢',
    'HEART': '♡',
    'SPADE': '♠',
};

// create helpers for rendering the cards so they can be reused in other files
export function createSgsCard(card) {
    return <div>
        <animated.img
            className='fill'
            src={`/cards/${card.type}.jpg`}
            alt={'card'}
        />
    </div>
}

function substituteName(text) {
    const matches = [...text.matchAll(/@(.+?)@/g)];
    for (let match of matches) {
        text = text.replace(match[0], STSMAP[match[1]].name);
    }
    return text;
}

export function createStsCard(card) {
    const { cat, rarity, color, name, desc } = STSMAP[card.type];
    return <div>
        <animated.img
            className='sts-component'
            src={`/sts-cards/${card.type}.png`}
            alt={'card-image'}
        />
        <animated.img
            className={'sts-frame ' + classNames('color', color)}
            src={`/sts-cards/card-frame-${cat}.png`}
            alt={'card-frame'}
        />
        <animated.img
            className={'sts-frame ' + classNames('rarity', rarity)}
            src={`/sts-cards/card-cat-${cat}.png`}
            alt={'card-frame'}
        />
        <animated.img
            className={'sts-frame ' + classNames('rarity', rarity)}
            src={`/sts-cards/card-border.png`}
            alt={'card-frame'}
        />
        <svg className="sts-frame" width="100%" height="100%" viewBox="0 0 400 571" xmlns="http://www.w3.org/2000/svg" >
            <text className={'sts-text name ' + classNames('text', rarity)} x="50%" y="9.75%" textAnchor="middle"
            >{name}</text>
        </svg>
        <svg className="sts-frame" width="100%" height="100%" viewBox="0 0 200 286" xmlns="http://www.w3.org/2000/svg" >
            <text className={'sts-text cat'} x="50%" y="55%" textAnchor="middle"
            >{cat}</text>
        </svg>
        <svg className="desc-frame" width="100%" height="100%" viewBox="0 0 165 115" xmlns="http://www.w3.org/2000/svg">
            <foreignObject x="0" y="0" width="165" height="115">
                <span className={'sts-text desc'}>
                    {substituteName(desc)}</span>
            </foreignObject>
        </svg>
    </div>
}

export default props => {
    const {
        faceUp,
        cardMode, // card mode: 'sgs', 'sts'
        card,
        alwaysDown,
    } = props;

    // Only render back side for cards that always face down
    if (alwaysDown === true) {
        return (cardMode === '') || (cardMode === 'sgs') ? (
            <animated.img
                className='fill'
                src={'/cards/Card Back.jpg'}
                alt={'card'}
            />
        ) : (
            <animated.img
                className='sts-frame'
                src={'/sts-cards/sts-card-back.png'}
                alt={'card-back'}
            />
        );
    }

    return (cardMode === '') || (cardMode === 'sgs') ? (
        <div>
            <animated.div style={{ opacity: faceUp.to(faceUp => faceUp > 0.5 ? 1 : 0) }} >
                {createSgsCard(card)}
                <animated.div
                    className={classNames('card-value', ['DIAMOND', 'HEART'].includes(card.suit) ? 'red' : 'black')}
                    style={{
                        opacity: faceUp,
                    }}
                >
                    {card.value}
                    <br />
                    {SUITS[card.suit]}
                </animated.div>
            </animated.div>
            <animated.div style={{ opacity: faceUp.to(faceUp => faceUp > 0.5 ? 0 : 1) }} >
                <animated.img
                    className='fill'
                    src={'/cards/Card Back.jpg'}
                    alt={'card'}
                />
            </animated.div>
        </div>
    ) : (
        <div>
            <animated.div
                style={{ opacity: faceUp.to(faceUp => faceUp > 0.5 ? 1 : 0) }}
            >
                {createStsCard(card)}
                <animated.div className={classNames('card-value', ['DIAMOND', 'HEART'].includes(card.suit) ? 'red' : 'black')}>
                    {card.value}
                    <br />
                    {SUITS[card.suit]}
                </animated.div>
            </animated.div >
            <animated.div style={{ opacity: faceUp.to(faceUp => faceUp > 0.5 ? 0 : 1) }} >
                <animated.img
                    className='sts-frame'
                    src={'/sts-cards/sts-card-back.png'}
                    alt={'card-back'}
                />
            </animated.div>
        </div >
    )
}