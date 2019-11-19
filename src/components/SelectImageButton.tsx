import * as React from 'react';
import styled from 'styled-components';
import {FormEvent} from "react";
import {Button} from "./Button";

interface ISelectImageButtonProps {
    loading?: boolean;
    onSelectImage: (imageBase64: string) => void;
}

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
  background-color: #343434;

  display: flex;
  flex-direction: column;
`;

export class SelectImageButton extends React.Component<ISelectImageButtonProps> {

    private inputElement: HTMLInputElement | null = null;

    public constructor(props: ISelectImageButtonProps) {
        super(props);
        this.onSelectFileClick = this.onSelectFileClick.bind(this);
        this.onFileSelected = this.onFileSelected.bind(this);
    }


    public render() {
        return (
            <Wrapper>
                <input
                    ref={(input: HTMLInputElement) => this.inputElement = input}
                    onChange={this.onFileSelected}
                    name="receipt"
                    type="file"
                    accept="image/*;capture=camera"
                    style={{display:'none'}}
                />
                <Button onClick={this.onSelectFileClick}>IZVĒLIETIES ČEKA ATTĒLU</Button>
            </Wrapper>
        );
    }

    private onSelectFileClick() {
        if (this.inputElement) {
            this.inputElement.click();
        }
    }

    private onFileSelected(event: FormEvent<HTMLInputElement>) {
        if (event.currentTarget.files && event.currentTarget.files.length > 0) {
            const image = event.currentTarget.files[0];
            this.getBase64(image).then((base64: string) => {
                this.setState({imageBase64: base64}, () => {
                    this.props.onSelectImage(base64);
                })
            });
        }

    }

    private getBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.result && typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject('Wrong file reader result type');
                }
            };
            reader.onerror = (error) => {
                console.log('Error: ', error);
                reject();
            };
        });
    }
}
