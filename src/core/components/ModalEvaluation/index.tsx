import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Modal } from "react-native";

import { Render } from "../Render";
import { Spacer } from "../Spacer";
import { useTheme } from "../../hooks";
import { AssetRobotAskingIcon, AssetRobotKindIcon, AssetRobotSmileIcon } from "../../../assets";

import {
  ButtonsRow,
  Clickable,
  Dislike,
  Horizontal,
  Like,
  ModalContainer,
  RobotBanner,
  RobotText,
  Star,
  Vertical,
  ViewContainer
} from "./styles";

export interface ModalEvaluationProps {
  type: "rating" | "popularity";
  isOpen: boolean;
  onResult: (e: number | "like" | "dislike") => void;
}

export const ModalEvaluation: FunctionComponent<ModalEvaluationProps> = ({ type, isOpen, onResult }) => {
  const [theme] = useTheme();
  const [isOpenModal, setOpenModal] = useState(isOpen);
  const [popularity, setPopularity] = useState<"none" | "like" | "dislike">("none");
  const [rating, setRating] = useState(0);
  const [thanks, setThanks] = useState(false);

  const mutex = useRef(false);
  const thanksRef = useRef<NodeJS.Timeout>();
  const openModalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setOpenModal(isOpen);
    return () => {
      if (thanksRef.current)
        clearTimeout(thanksRef.current);

      if (openModalRef.current)
        clearTimeout(openModalRef.current);
    }
  }, [isOpen]);

  function onPopularityChoosed(result: "like" | "dislike"){
    if (!mutex.current){
      mutex.current = true;
      setPopularity(result);
      onResult(result);
      thanksRef.current = setTimeout(() => setThanks(true), 1000);
      openModalRef.current = setTimeout(() => setOpenModal(false), 2500);
    }
  }

  function onRatingChoosed(result: number){
    if (!mutex.current){
      mutex.current = true;
      setRating(result);
      onResult(result);
      thanksRef.current = setTimeout(() => setThanks(true), 1000);
      openModalRef.current = setTimeout(() => setOpenModal(false), 2500);
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpenModal}
    >
      <ModalContainer activeOpacity={1}>
        <ViewContainer {...theme}>

          <Render if={!thanks && (type == "popularity")}>
            <Vertical>

              <RobotBanner 
                {...theme} 
                resizeMode="contain" 
                source={AssetRobotKindIcon} 
              />
              <Spacer verticalSpace={18} />

              <RobotText {...theme}>O que você achou desse curso?</RobotText>
              <Spacer verticalSpace={18} />

              <ButtonsRow>
                <Horizontal>

                  <Clickable 
                    onPress={() => onPopularityChoosed("like")} 
                    activeOpacity={0.7} 
                    testID="modalEvaluation.like"
                  >
                    <Like 
                      name="like1" 
                      size={48} 
                      color={popularity == "like" ? theme.blue : theme.evaluationColor} 
                    />
                  </Clickable>

                  <Clickable 
                    onPress={() => onPopularityChoosed("dislike")} 
                    activeOpacity={0.7}
                    testID="modalEvaluation.dislike"
                  >
                    <Dislike
                      name="dislike1"
                      size={48}
                      color={popularity == "dislike" ? theme.blue : theme.evaluationColor}
                      style={{
                        transform: [
                          { rotateX: "180deg" }, //Horizontal
                          { scaleX: -1 }, //Horizontal
                          { scaleY: -1 } //Vertical
                        ]
                      }}
                    />
                  </Clickable>

                </Horizontal>
              </ButtonsRow>

            </Vertical>
          </Render>

          <Render if={!thanks && (type == "rating")}>
            <Vertical>

              <RobotBanner
                {...theme}
                resizeMode="contain"
                source={AssetRobotAskingIcon}
              />
              <Spacer verticalSpace={18} />

              <RobotText {...theme}>O nosso questionário te ajudou a decidir qual curso você se encaixa?</RobotText>
              <Spacer verticalSpace={18} />

              <ButtonsRow>
                <Horizontal>

                  {[...Array(5)].map((_, i) => (
                    <Clickable 
                      activeOpacity={0.7} 
                      onPress={() => onRatingChoosed(i+1)} 
                      key={String(i)}
                      testID={"modalEvaluation.star" + i}
                    >
                      <Star 
                        key={String(i)}
                        name="star" 
                        size={38} 
                        color={rating > i ? theme.yellow : theme.evaluationColor} 
                      />
                    </Clickable>
                  ))}

                </Horizontal>
              </ButtonsRow>

            </Vertical>
          </Render>

          <Render if={thanks}>
            <Vertical>
              <RobotBanner
                {...theme}
                resizeMode="contain"
                source={AssetRobotSmileIcon}
              />
              <Spacer verticalSpace={18} />

              <RobotText {...theme}>Obrigado, sua avaliação nos ajuda a evoluirmos!</RobotText>
              <Spacer verticalSpace={18} />

            </Vertical>
          </Render>

        </ViewContainer>
      </ModalContainer>
    </Modal>
  );
}
