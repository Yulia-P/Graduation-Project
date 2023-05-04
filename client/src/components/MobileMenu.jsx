import React from 'react';
import {NavItem} from "./NavItam";
import {MenuItem} from "./MenuItem";
import {ARTICLES, DISCOUNTS, MARKS} from "./constants";
import {Button} from "./Button";

export const MobileMenu = ({isOpen = false}) => {
    return(
        <React.Fragment>
            <div className={`absolute xl:hidden top-0 left-0 right-0 bg-almost-black opacity-50 z-10 min-h-[150vh] ${isOpen ? 'flex' : 'hidden'}`}/>
            <div className={`absolute xl:hidden top-0 right-0 w-1/2 bg-green-bk z-20 justify-center min-h-[150vh] ${isOpen ? 'flex' : 'hidden'}`}>
                <nav className={'my-20 mx-5 space-y-5 text-lg w-full'}>
                    <NavItem text={'Статьи'}>
                        <div className={'flex flex-col space-y-5 p-2'}>
                            {ARTICLES.map(({text, icon}) => <MenuItem key={text} text={text} icon={icon}/>)}
                        </div>
                    </NavItem>
                    <NavItem text={'Прием вторсырья'}/>
                    <NavItem text={'Виды вторсырья'}>
                        <div className={'flex flex-col space-y-5 p-2'}>
                            {MARKS.map(({text, icon}) => <MenuItem key={text} text={text} icon={icon}/>)}
                        </div>
                    </NavItem>
                    <NavItem text={'Скидки'}>
                        <div className={'flex flex-col space-y-5 p-2'}>
                            {DISCOUNTS.map(({text, icon}) => <MenuItem key={text} text={text} icon={icon}/>)}
                        </div>
                    </NavItem>
                    <div className={'flex flex-col space-y-5'}>
                        <Button>Войти</Button>
                        <Button hasBorder={true}>Регистариция</Button>
                    </div>

                </nav>
            </div>
        </React.Fragment>
    )
}