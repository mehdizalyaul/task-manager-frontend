import React from 'react';
import {Calendar, CheckCircle, Link} from 'lucide-react';
import {Tag} from '../Tag';
import {Avatar} from '../Avatar';


import './Card.css';

export const Card = ({
                                              tags,
                                              title,
                                              date,
                                              progress,
                                              links,
                                              assignee,
                                              emoji,
                                              priority,
                                              onClick
                                          }) => {
    return (
        <div className="card" onClick={onClick}>
            {tags.length > 0 && (
                <div className="card-tags">
                    {tags.map(tag => (
                        <Tag key={tag.id} color={tag.color}>{tag.name}</Tag>
                    ))}
                </div>
            )}

            <h3 className="card-title">
                {emoji && <span className="card-emoji">{emoji}</span>}
                {title}
            </h3>

            <div className="card-footer">
                <div className="card-meta">
                    {priority && (
                        <div className="meta-item">
                            <span className={`priority-badge priority-${priority.toLowerCase()}`}>{priority}</span>
                        </div>
                    )}
                    
                    {date && (
                        <div className="meta-item">
                            <Calendar className="meta-icon"/>
                            <span>{date}</span>
                        </div>
                    )}

                    {progress && (
                        <div className="meta-item">
                            <CheckCircle className="meta-icon"/>
                            <span>{progress}</span>
                        </div>
                    )}

                    {links && (
                        <div className="meta-item">
                            <Link className="meta-icon"/>
                            <span>{links}</span>
                        </div>
                    )}
                </div>

                {assignee && <Avatar src={assignee} alt="Assignee" size="xs"/>}
            </div>
        </div>
    );
};
