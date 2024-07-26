import React, { useEffect, useRef, useState } from 'react';

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scoreRef = useRef<HTMLSpanElement | null>(null);
  const finalScoreRef = useRef<HTMLSpanElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonPlayRef = useRef<HTMLButtonElement | null>(null);
  const directionRef = useRef<string | undefined>();

  const size = 30;
  const initialPosition = { x: 270, y: 240 };
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([initialPosition]);
  
  const [isGameOver, setIsGameOver] = useState(false);

  const incrementScore = () => {
    if (scoreRef.current) {
      scoreRef.current.innerText = `${+scoreRef.current.innerText + 10}`;
    }
  };

  const randomNumber = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const randomPosition = () => {
    const number = randomNumber(0, 400 - size);
    return Math.round(number / size) * size;
  };

  const randomColor = () => {
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const [food, setFood] = useState<{ x: number; y: number; color: string }>({
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor(),
  });
  
  useEffect(() => {
    const drawFood = (ctx: CanvasRenderingContext2D) => {
      const { x, y, color } = food;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, size, size);
      ctx.shadowBlur = 0;
    };

    const drawSnake = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "#ddd";
      snake.forEach((position, index) => {
        if (index === snake.length - 1) {
          ctx.fillStyle = "white";
        }
        ctx.fillRect(position.x, position.y, size, size);
      });
    };

    const moveSnake = () => {
      const direction = directionRef.current;
      if (!direction) return;

      const newSnake = [...snake];
      const head = newSnake[newSnake.length - 1];

      if (direction === 'right') {
        newSnake.push({ x: head.x + size, y: head.y });
      } else if (direction === 'left') {
        newSnake.push({ x: head.x - size, y: head.y });
      } else if (direction === 'down') {
        newSnake.push({ x: head.x, y: head.y + size });
      } else if (direction === 'up') {
        newSnake.push({ x: head.x, y: head.y - size });
      }

      newSnake.shift();
      setSnake(newSnake);
    };

    const drawGrid = (ctx: CanvasRenderingContext2D) => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#191919';

      for (let i = 30; i < 400; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 400);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(400, i);
        ctx.stroke();
      }
    };

    const checkEat = () => {
      const head = snake[snake.length - 1];

      if (head.x === food.x && head.y === food.y) {
        incrementScore();
        setSnake((prevSnake) => [...prevSnake, head]);

        let x = randomPosition();
        let y = randomPosition();

        while (snake.some((position) => position.x === x && position.y === y)) {
          x = randomPosition();
          y = randomPosition();
        }

        setFood({ x, y, color: randomColor() });
      }
    };

    const checkCollision = () => {
      const head = snake[snake.length - 1];
      const canvasLimit = 400 - size;
      const neckIndex = snake.length - 2;

      const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;
      const selfCollision = snake.some((position, index) => index < neckIndex && position.x === head.x && position.y === head.y);

      if (wallCollision || selfCollision) {
        gameOver();
      }
    };

    const gameOver = () => {
      setIsGameOver(true);

      if (menuRef.current && finalScoreRef.current && scoreRef.current && canvasRef.current) {
        menuRef.current.style.display = 'flex';
        finalScoreRef.current.innerText = scoreRef.current.innerText;
        canvasRef.current.style.filter = 'blur(2px)';
      }
    };

    const gameLoop = () => {
      if (!canvasRef.current || isGameOver) return;

      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, 600, 600);
      drawGrid(ctx);
      drawFood(ctx);
      moveSnake();
      drawSnake(ctx);
      checkEat();
      checkCollision();

      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === 'ArrowRight' && directionRef.current !== 'left') {
        directionRef.current = 'right';
      } else if (key === 'ArrowLeft' && directionRef.current !== 'right') {
        directionRef.current = 'left';
      } else if (key === 'ArrowDown' && directionRef.current !== 'up') {
        directionRef.current = 'down';
      } else if (key === 'ArrowUp' && directionRef.current !== 'down') {
        directionRef.current = 'up';
      }
    };

    const handlePlayButtonClick = () => {
      if (scoreRef.current && menuRef.current && canvasRef.current) {
        scoreRef.current.innerText = '00';
        menuRef.current.style.display = 'none';
        canvasRef.current.style.filter = 'none';
        setSnake([initialPosition]);
        setIsGameOver(false);
        directionRef.current = undefined;
        setFood({
          x: randomPosition(),
          y: randomPosition(),
          color: randomColor(),
        });
        requestAnimationFrame(gameLoop); // Restart the game loop
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    buttonPlayRef.current?.addEventListener('click', handlePlayButtonClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      buttonPlayRef.current?.removeEventListener('click', handlePlayButtonClick);
    };
  }, [food, snake, isGameOver]);

  return (
    <section className="hidden sm:block relative rounded-lg bg-black">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black bg-opacity-75" ref={menuRef} style={{ display: 'none' }}>
        <h1 className="text-white text-4xl mb-4">Game Over</h1>
        <div className="text-white text-2xl mb-4">Final Score: <span ref={finalScoreRef}></span></div>
        <button className="bg-white text-black rounded-lg p-4 text-xl" ref={buttonPlayRef}>Play Again</button>
      </div>
      <div className="absolute top-2 left-2 text-white text-2xl">Score: <span ref={scoreRef}>00</span></div>
      <canvas ref={canvasRef} width="500" height="400" className="block"></canvas>
    </section>
  );
};

export default SnakeGame;
