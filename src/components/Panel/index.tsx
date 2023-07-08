// game controller panel
import React from "react";
import Button from "./Button";

const Panel = () => {
  return (
    <div className="mx-8 flex">
      <div className="flex-1">
        <div className="flex justify-around">
          <Button
            label="暂停"
            size="sm"
            bg="green"
            onClick={(e) => {
              console.log(e);
            }}
          />
          <Button
            label="音效"
            size="sm"
            bg="green"
            onClick={(e) => {
              console.log(e);
            }}
          />
          <Button
            label="重玩"
            size="sm"
            bg="red"
            onClick={(e) => {
              console.log(e);
            }}
          />
        </div>
        <div className="mt-16">
          <Button
            label="掉落"
            size="lg"
            onClick={(e) => {
              console.log(e);
            }}
          />
        </div>
      </div>
      <div className="flex-1">
        <Button
          label="旋转"
          size="md"
          onClick={(e) => {
            console.log(e);
          }}
        />
        <div className="flex justify-between">
          <Button
            label="左移"
            size="md"
            onClick={(e) => {
              console.log(e);
            }}
          />
          <Button
            label="右移"
            size="md"
            onClick={(e) => {
              console.log(e);
            }}
          />
        </div>
        <Button
          label="下移"
          size="md"
          onClick={(e) => {
            console.log(e);
          }}
        />
      </div>
    </div>
  );
};

export default Panel;
