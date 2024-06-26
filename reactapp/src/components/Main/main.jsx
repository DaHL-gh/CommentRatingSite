import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import "./style.css";
import Diagrams from "../diagrams/Diagrams";
import fetchData from "../../utils/fetchData";
import ParticlesComponent from "../Particles/particles";
import TypingAnimation from "../../utils/typingmessage";


const Main = () => {
	const inputRef = useRef();
	const [inputValue, setInputValue] = useState("");
	const [fetchedData, setFetchedData] = useState(null);


	const handleInputChange = async (event) => {
		event.preventDefault();
		const url = inputRef.current.value;
		inputRef.current.value = "";
		const model_version = "latest";
		const data = await fetchData(url, model_version); 
		if (data) {
			setInputValue(data.comments_count); 
			setFetchedData(data);
		}
		inputRef.current.value = "";
	};
	let message;
	if (fetchedData) {
		let { positive, negative, neutral, comments_count } = fetchedData;
		positive = Math.round(positive + neutral / 4) 
		negative = Math.round(negative + neutral / 4)
		neutral = Math.floor(neutral - neutral / 2)
		console.log(positive, negative, neutral)
		const positivePercent = (( positive / comments_count) * 100).toFixed(2);
		const negativePercent = ((negative / comments_count) * 100).toFixed(2);
		const neutralPercent = ((neutral/ comments_count) * 100).toFixed(2);

		if (positive > 0.8 * comments_count) {
			message = `Анализ данных показывает значительное преобладание положительных отзывов (${positivePercent}% от общего числа комментариев), что свидетельствует о высокой степени удовлетворенности пользователей представленным контентом. Это может быть результатом эффективной стратегии контент-маркетинга и качественного взаимодействия с целевой аудиторией.`;
		} else if (negative > 0.8 * comments_count) {
			message = `Обнаружено преобладание отрицательных отзывов (${negativePercent}%), что требует дополнительного анализа и возможно, пересмотра подходов к созданию и распространению контента. Важно учитывать эту информацию для оптимизации стратегии и повышения уровня удовлетворенности аудитории.`;
		} else if (neutral > 0.8 * comments_count) {
			message = `Высокий процент нейтральных отзывов (${neutralPercent}%) может свидетельствовать о недостаточной вовлеченности аудитории и отсутствии ярко выраженных эмоций в ответ на представленный контент. Рекомендуется провести дополнительные исследования для выявления потенциальных путей улучшения.`;
		} else if (positive > negative && positive > neutral) {
			message = `Положительные отзывы составляют большую часть комментариев (${positivePercent}%), что указывает на успешное восприятие контента большинством пользователей. Это положительный сигнал, который подтверждает правильность выбранной стратегии и направления развития.`;
		} else if (negative > positive && negative > neutral) {
			message = `Отрицательные отзывы преобладают (${negativePercent}%), что является индикатором необходимости проведения детального анализа предложений пользователей и их ожиданий от контента. Возможно, потребуется корректировка подходов к созданию материалов.`;
		} else if (neutral > positive && neutral > negative) {
			message = `Нейтральные отзывы занимают ведущую позицию (${neutralPercent}%), что может указывать на сбалансированное содержание контента, однако для усиления вовлеченности целесообразно рассмотреть возможности улучшения.`;
		} else if (positive === negative && positive > neutral) {
			message = `Наблюдается равное количество положительных и отрицательных отзывов (${positivePercent}% каждый), что требует особого внимания к деталям обратной связи для выявления ключевых аспектов, влияющих на восприятие контента.`;
		} else if (comments_count === 0) {
			message = `На данный момент комментарии отсутствуют, что может свидетельствовать о начальной стадии ознакомления аудитории с контентом. Рекомендуется активизировать меры по его продвижению.`;
		} else if (positive === negative && positive === neutral) {
			message = `Равномерное распределение всех типов отзывов свидетельствует о разнообразии восприятия контента различными группами пользователей. Это может быть использовано для дальнейшего изучения предпочтений аудитории.`;
		} else if (positive > 0.5 * comments_count && negative < 0.2 * comments_count) {
			message = `Доминирование положительных отзывов (${positivePercent}%) при относительно низком уровне отрицательных комментариев указывает на успешное взаимодействие с аудиторией и эффективность текущего контент-плана.`;
		} else if (negative > 0.5 * comments_count && positive < 0.2 * comments_count) {
			message = `Преобладание отрицательных отзывов (${negativePercent}%) требует незамедлительного внимания и анализа причин недовольства пользователей, а также разработки мер по улучшению ситуации.`;
		} else if (neutral > 0.5 * comments_count && positive < 0.2 * comments_count) {
			message = `Большое количество нейтральных отзывов (${neutralPercent}%) может свидетельствовать о потенциале для увеличения вовлеченности и активности аудитории через инновационные подходы к созданию контента.`;
		} else if (positive > negative && neutral > negative) {
			message = `Положительные и нейтральные отзывы составляют большую часть комментариев, что свидетельствует о благоприятном восприятии контента и возможности дальнейшего укрепления позитивного имиджа.`;
		} else if (positive > 0.9 * comments_count) {
			message = `Исключительно высокий уровень положительных отзывов (${positivePercent}%) является ярким свидетельством того, что представленный контент находит резонанс среди аудитории и вызывает одобрение. Это отражает эффективность применяемых методов взаимодействия и предоставляет ценные инсайты для дальнейшего развития.`;
		} else if (negative > 0.9 * comments_count) {
			message = `Критический уровень отрицательных отзывов (${negativePercent}%) требует немедленного внимания и пересмотра стратегии контент-производства. Необходимо провести глубокий анализ обратной связи для выявления корневых причин недовольства и разработки плана действий по улучшению ситуации.`;
		} else if (neutral > 0.9 * comments_count) {
			message = `Преобладание нейтральных отзывов (${neutralPercent}%) указывает на то, что контент не вызывает значительных эмоций у большинства пользователей. Возможно, стоит рассмотреть варианты усиления эмоциональной составляющей для повышения вовлеченности аудитории.`;
		} else if (positive === 0.5 * comments_count && negative === 0.5 * comments_count) {
			message = `Равное соотношение положительных и отрицательных отзывов (${positivePercent}% каждый) свидетельствует о поляризации мнений аудитории. Это может быть использовано для более точного позиционирования контента и определения целевых групп.`;
		} else if (neutral === comments_count) {
			message = `Полное отсутствие положительных и отрицательных отзывов, при полном нейтральном восприятии (${neutralPercent}%), может свидетельствовать о недостаточной информативности или выразительности контента. Рекомендуется пересмотреть подходы к его созданию.`;
		} else if (positive > 0.7 * comments_count && negative < 0.1 * comments_count) {
			message = `Заметное преобладание положительных отзывов (${positivePercent}%) при минимальном количестве отрицательных комментариев подчеркивает успешность текущей стратегии и может служить основой для ее дальнейшего укрепления.`;
		} else if (negative > 0.7 * comments_count && positive < 0.1 * comments_count) {
			message = `Высокий процент отрицательных отзывов (${negativePercent}%) при низком уровне положительных комментариев требует особого внимания к качеству контента и его соответствию ожиданиям аудитории.`;
		} else if (neutral > 0.7 * comments_count && positive < 0.1 * comments_count) {
			message = `Преобладание нейтральных отзывов (${neutralPercent}%) при отсутствии значительного количества положительных комментариев может указывать на потребность в усилении вовлеченности и интерактивности представляемого материала.`;
		} else if (positive > 0.6 * comments_count && negative < 0.3 * comments_count) {
			message = `Большинство положительных отзывов (${positivePercent}%) при умеренном количестве отрицательных комментариев отражает общую тенденцию удовлетворенности контентом, но также указывает на возможность его дальнейшего улучшения.`;
		} else if (negative > 0.6 * comments_count && positive < 0.3 * comments_count) {
			message = `Преобладание отрицательных отзывов (${negativePercent}%) при относительно небольшом количестве положительных комментариев требует внимательного рассмотрения предпочтений аудитории и адаптации контента.`;
		} else if (neutral > 0.6 * comments_count && positive < 0.3 * comments_count) {
			message = `Большое количество нейтральных отзывов (${neutralPercent}%) при низком уровне положительных комментариев может свидетельствовать о необходимости более активного взаимодействия с аудиторией и повышения интереса к контенту.`;
		} else {
			message = `Анализ комментариев показывает разнообразие мнений среди пользователей, что требует комплексного подхода к изучению обратной связи и адаптации контента под нужды различных сегментов аудитории.`;
		}
		
	} else {
		message = 'Для получения статистики, пожалуйста, введите ссылку на интересующий контент.';
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.2 } }}
		>
			<div className="main">
				<Diagrams className="diogram" data={fetchedData} />
				{/* <p>{inputValue}</p> */}
				<TypingAnimation text={message} />
				<br />
				<form onSubmit={handleInputChange}>
					<input
						className="main_input"
						type="text"
						ref={inputRef}
						placeholder="Введите ссылку"
					/>
					<button className="btn1" type="submit">
						➤
					</button>
				</form>
				{/* <ParticlesComponent id='particles'/> */}
			</div>
		</motion.div>
	);
};

export default Main;
